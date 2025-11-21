FROM jenkins/jenkins:lts

USER root
RUN apt-get update && apt-get install -y sudo docker.io

# Copy plugins.txt to REF directory
COPY plugins.txt /usr/share/jenkins/ref/plugins.txt

# Install plugins BEFORE Jenkins starts
RUN jenkins-plugin-cli --plugin-file /usr/share/jenkins/ref/plugins.txt

# Copy JCasC config
COPY jenkins.yaml /usr/share/jenkins/ref/jenkins.yaml

# Copy Groovy init scripts
COPY init.groovy.d/ /usr/share/jenkins/ref/init.groovy.d/

USER jenkins
