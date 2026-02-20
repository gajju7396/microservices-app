pipeline {
    agent gajju7

    environment {
        DOCKER_REPO = "gajju7396/microservices-app"
        VERSION = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/gajju7396/microservices-app.git'
            }
        }

        stage('Build Images') {
            steps {
                sh """
                docker build -t $DOCKER_REPO-user:$VERSION ./user-service
                docker build -t $DOCKER_REPO-order:$VERSION ./order-service
                docker build -t $DOCKER_REPO-gateway:$VERSION ./api-gateway
                """
            }
        }

        stage('Push Images') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'docker-creds',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh """
                    echo $PASS | docker login -u $USER --password-stdin
                    docker push $DOCKER_REPO-user:$VERSION
                    docker push $DOCKER_REPO-order:$VERSION
                    docker push $DOCKER_REPO-gateway:$VERSION
                    """
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh """
                kubectl set image deployment/user-service user-service=$DOCKER_REPO-user:$VERSION
                kubectl set image deployment/order-service order-service=$DOCKER_REPO-order:$VERSION
                kubectl set image deployment/api-gateway api-gateway=$DOCKER_REPO-gateway:$VERSION
                """
            }
        }
    }
}
