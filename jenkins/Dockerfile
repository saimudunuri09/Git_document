FROM jenkins/jenkins:lts

USER root
RUN apt-get update && apt-get install -y sudo docker.io

COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
RUN jenkins-plugin-cli --plugin-file /usr/share/jenkins/ref/plugins.txt

COPY jenkins.yaml /var/jenkins_home/jenkins.yaml

COPY init.groovy.d/ /var/jenkins_home/init.groovy.d/

USER jenkins
