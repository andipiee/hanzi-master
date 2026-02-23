# Deploy workflow (OIDC + IAM role)

The workflow uses **GitHub OIDC** to assume an IAM role—no long-lived AWS access keys.

## GitHub secrets

| Secret | Required | Description |
|--------|----------|-------------|
| `AWS_ROLE_ARN` | Yes | ARN of the IAM role to assume (e.g. `arn:aws:iam::123456789012:role/github-actions-deploy`) |
| `S3_BUCKET_NAME` | Yes | S3 bucket for the static site |
| `CLOUDFRONT_DISTRIBUTION_ID` | Yes | CloudFront distribution to invalidate |
| `AWS_REGION` | No | AWS region (default: `us-east-1`) |

## AWS setup

### 1. GitHub OIDC provider (one-time per account)

Create an OIDC identity provider:

- **Provider URL:** `https://token.actions.githubusercontent.com`
- **Audience:** `sts.amazonaws.com` (default)

Or via CLI:

```bash
aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com \
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1
```

(Use the [GitHub thumbprint](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services#adding-the-identity-provider-to-iam) for your region if different.)

### 2. IAM role and trust policy

Create a role that GitHub Actions can assume.

**Trust policy** (replace `YOUR_GITHUB_ORG` and `YOUR_REPO`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::YOUR_ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:YOUR_GITHUB_ORG/YOUR_REPO:*"
        }
      }
    }
  ]
}
```

Tighten `sub` as needed (e.g. `repo:org/repo:ref:refs/heads/main` for main only).

### 3. Permissions for the role

Attach a policy that allows:

- **S3:** `s3:PutObject`, `s3:GetObject`, `s3:DeleteObject`, `s3:ListBucket` on the deploy bucket (and prefix).
- **CloudFront:** `cloudfront:CreateInvalidation`.

Example minimal policy (replace bucket and optional distribution ARN):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::YOUR_BUCKET_NAME",
        "arn:aws:s3:::YOUR_BUCKET_NAME/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": "cloudfront:CreateInvalidation",
      "Resource": "arn:aws:cloudfront::YOUR_ACCOUNT_ID:distribution/YOUR_DISTRIBUTION_ID"
    }
  ]
}
```

After creating the role, set **GitHub → Settings → Secrets and variables → Actions** and add `AWS_ROLE_ARN` (and the other secrets) as above.
