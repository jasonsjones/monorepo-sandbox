#!/bin/bash

su - postgres
createdb -h localhost -p 5432 sandbox-test
[ $? -eq 0 ] && echo "sandbox-test db is setup..." || echo "sandbox-text db is not created"