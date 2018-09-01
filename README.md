# tedx2018

# Production

## Provison Prodution Server
sudo ansible-playbook server.yml -e env=production

## Deploy Production Site
sudo ./bin/deploy.sh production www.tedxsaotome.com

# Staging

## Provision Staging Server
sudo ansible-playbook server.yml -e env=staging

## Deploy Staging Site
sudo ./bin/deploy.sh staging tedx2018.haam.co

## Rollback
sudo ansible-playbook rollback.yml -e "site=www.tedxsaotome.com env=production" --extra-vars='release=20180719122336'
