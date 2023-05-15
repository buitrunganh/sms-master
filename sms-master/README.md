# SMS

SMS server to connect with Kannel SMS gateway and provide gRPC api

## Add Submodule

git submodule update --init

## Delivery Report

## Setup enviroment local

```docker
    docker run -d --name smsdlr -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres postgres
    docker exec -it smsdlr sh
```

```sh
    psql -U postgres -W
    Create datanase smsdlr;
```

## Dlr_type

  - 1: status = 'delivery success';
  - 2: status = 'delivery falied';
  - 4: status = 'message buffered';
  - 8: status = 'smsc submit';
  - 16: status = 'smsc reject'
