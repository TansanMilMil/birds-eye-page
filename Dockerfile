FROM amazon/aws-cli:latest
RUN curl -fsSL https://rpm.nodesource.com/setup_16.x | bash - && \
    yum install -y nodejs
WORKDIR /project