NAMESPACE=cp4i
APP_NAME=frontend
GIT_REPO=https://github.com/chrisphillips-cminion/lab
GIT_CONTEXT_DIR=Frontend
MEMORY_REQUEST="4096"
CPU_LIMIT="4.0"
STUDENTNO=student01

echo -e "\n[2/3]Building the JMeter container image"
oc process -f frontend-bc.yaml \
    -p APP_NAMESPACE=$NAMESPACE \
    -p APPLICATION_NAME=$APP_NAME \
    -p GIT_CONTEXT_DIR=$GIT_CONTEXT_DIR \
    -p GIT_REPOSITORY=$GIT_REPO | oc apply -f -



# # Deploy the RHDG client
echo -e "\n[3/3]Deploying the JMeter client"
oc process -f frontend-dc.yaml \
    -p APP_NAMESPACE=$NAMESPACE \
    -p APPLICATION_NAME=$APP_NAME \
    -p URL=http://db1.cp4i.svc.cluster.local:3001 \
    -p LABNO=1193 \
    -p STUDENTNO=$STUDENTNO  | oc apply -f -

oc expose dc/frontend --port 3001
