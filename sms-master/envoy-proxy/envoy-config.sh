#!/usr/bin/env bash

## This script will generate new main.go file with all generated proto stuff imported

TEMPLATE_FILE=envoy.yaml
OUTPUT_FILE=/tmp/generated-config.yaml

VAR_TO_PASS="ENDPOINT"

cat ${TEMPLATE_FILE} > ${OUTPUT_FILE}

for VAR in ${VAR_TO_PASS}; do
    echo ${VAR}
    eval VALUE=\$${VAR}

    TEMPLATE_CONTENT=$(<${OUTPUT_FILE})
    echo -e "${TEMPLATE_CONTENT//\$$VAR/$VALUE}" > ${OUTPUT_FILE}

done

cat ${OUTPUT_FILE}
