#!groovy
pipeline {
    agent { label 'docker' }

    environment {
        PRODUCT = "tc"
        APP = "country-authority-etl"
        COMPOSE_NAME = "tc-ca-${EXECUTOR_NUMBER}"
        DB_HOST="db"
    }

    stages {
        stage('Prepare') {
            steps {
                script {
                    preSteps()
                    scm = checkout scm
                    env.VERSION = bumpSemver()
                    currentBuild.displayName = "#${env.BUILD_ID} - ${scm.GIT_COMMIT.substring(0,7)} - ${VERSION} - ${BRANCH}"
                }
            }
        }

        stage('Test') {
            agent {
                docker {
                    image 'node:22.2.0'
                    args "-e HOME=${WORKSPACE} -e SONAR_USER_HOME=${WORKSPACE}"
                    reuseNode true
                }
            }
            stages {
                stage('Lint') {
                    steps {
                        sh "npm ci"
                        sh 'npm run lint'
                    }
                }
                stage('Run tests') {
                    steps {
                        sh 'npm run test'
                    }
                }
                stage('Audit') {
                    steps {
                        sh 'npm audit --audit-level=critical'
                    }
                }
                stage('Sonar') {
                    when {
                        expression { BRANCH == 'dev' }
                    }
                    steps {
                        withSonarQubeEnv('direct') {
                            sh """
                                find node_modules/@fastify -type d -name "test" -exec rm -rf {} +
                                npx eslint . --ext .ts --report-unused-disable-directives -f json -o ./eslint_report.json || echo 'continue on error'
                                npx --yes sonarqube-scanner \
                                    -Dsonar.test.inclusions=test/**/*,**/*.spec.ts \
                                    -Dsonar.exclusions=chart/**,node_modules/** \
                                    -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                                    -Dsonar.eslint.reportPaths=eslint_report.json \
                                    -Dsonar.projectKey=${APP} -Dsonar.projectVersion=${VERSION}
                            """
                        }
                    }
                }
            }
        }

        stage('Test E2E') {
            steps {
                script {
                    sh "docker compose -p ${COMPOSE_NAME} up --quiet-pull --wait"
                    docker.image('node:22.2.0').inside("--net=${COMPOSE_NAME}_default") {
                        sh "npm run test:db:setup"
                        sh "npm run test:e2e"
                    }
                }
            }
            post {
                always {
                    sh "docker compose -p ${COMPOSE_NAME} down --volumes"
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    docker.withRegistry(DOCKER_REGISTRY, DOCKER_REGISTRY_CREDENTIALS) {
                        docker.build("${PRODUCT}/${APP}:${VERSION}", "--build-arg VERSION='${VERSION}' .").push()
                        pushHelmChart()
                    }
                }
            }
        }
    }

    post {
        always {
            postSteps()
        }
        success {
            createTag()
        }
    }
}
