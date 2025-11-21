FROM jenkins/jenkins:lts

# ---------------------------
# Disable Jenkins setup wizard
# ---------------------------
ENV JAVA_OPTS="-Djenkins.install.runSetupWizard=false"
ENV JENKINS_OPTS="--httpPort=8080"

USER root

# ---------------------------
# Install Docker CLI + Node.js 20
# ---------------------------
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    docker.io \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && groupadd -f docker \
    && usermod -aG docker jenkins \
    && chmod 666 /var/run/docker.sock || true \
    && rm -rf /var/lib/apt/lists/*

# Verify installation
RUN node --version && npm --version && docker --version

# Switch back to Jenkins user
USER jenkins

# ---------------------------
# Install Jenkins plugins BEFORE JCasC
# ---------------------------
COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
RUN jenkins-plugin-cli --plugin-file /usr/share/jenkins/ref/plugins.txt

# ---------------------------
# Copy Jenkins Configuration-as-Code YAML
# ---------------------------
COPY jenkins.yaml /usr/share/jenkins/ref/casc_configs/jenkins.yaml
ENV CASC_JENKINS_CONFIG=/usr/share/jenkins/ref/casc_configs/jenkins.yaml

# ---------------------------
# Copy Groovy init scripts
# ---------------------------
COPY init.groovy.d/ /usr/share/jenkins/ref/init.groovy.d/

# Skip plugin wizard
RUN echo 2.0 > /usr/share/jenkins/ref/jenkins.install.UpgradeWizard.state
RUN echo 2.0 > /usr/share/jenkins/ref/jenkins.install.InstallUtil.lastExecVersion
