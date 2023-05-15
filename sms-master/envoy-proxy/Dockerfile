FROM envoyproxy/envoy:latest

WORKDIR /etc/envoy/

COPY ./envoy.yaml .
COPY ./envoy-config.sh .

RUN chmod +x /etc/envoy/envoy-config.sh

CMD cat /etc/envoy/envoy-config.sh | bash && /usr/local/bin/envoy -c /tmp/generated-config.yaml
