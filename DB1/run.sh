NAMESPACE=cp4i
APP_NAME=db1
GIT_REPO=https://github.com/chrisphillips-cminion/lab
GIT_CONTEXT_DIR=DB1
MEMORY_REQUEST="4096"
MEMORY_LIMIT="6144"
CPU_REQUEST="3.0"
CPU_LIMIT="4.0"

echo -e "\n[2/3]Building the JMeter container image"
oc process -f db1-bc.yaml \
    -p APP_NAMESPACE=$NAMESPACE \
    -p APPLICATION_NAME=$APP_NAME \
    -p GIT_CONTEXT_DIR=$GIT_CONTEXT_DIR \
    -p GIT_REPOSITORY=$GIT_REPO | oc apply -f -

exit

# # Deploy the RHDG client
echo -e "\n[3/3]Deploying the JMeter client"
oc process -f templates/jmeter-dc.yaml \
    -p APP_NAMESPACE=$NAMESPACE \
    -p APPLICATION_NAME=$APP_NAME \
    -p MEMORY_REQUEST=$MEMORY_REQUEST \
    -p MEMORY_LIMIT=$MEMORY_LIMIT \
    -p CPU_REQUEST=$CPU_REQUEST \
    -p CPU_LIMIT=$CPU_LIMIT | oc apply -f -
