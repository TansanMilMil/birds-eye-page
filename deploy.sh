#!/bin/bash -ex

cd `dirname $0`
npm run build
aws s3 sync --exact-timestamps ./build s3://birds-eye-pages
aws s3 cp ./robots.txt s3://birds-eye-pages
aws cloudfront create-invalidation --distribution-id EKQ6CPC0T7A08 --paths "/*"