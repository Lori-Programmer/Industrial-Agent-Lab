param(
  [string]$HostName = "43.143.107.200",
  [string]$User = "ubuntu",
  [int]$Port = 22,
  [string]$KeyPath = ".deploy\utmaxs_ed25519",
  [string]$Archive = "utmaxs-site.tar.gz"
)

$ErrorActionPreference = "Stop"

if (!(Test-Path -LiteralPath $KeyPath)) {
  throw "SSH key not found: $KeyPath"
}

if (!(Test-Path -LiteralPath $Archive)) {
  tar --exclude=.next --exclude=node_modules --exclude=out --exclude=.deploy --exclude=utmaxs-site.tar.gz --exclude=.git -czf $Archive .
}

scp -i $KeyPath -P $Port $Archive "${User}@${HostName}:/tmp/utmaxs-site.tar.gz"

$remote = @'
set -e
sudo apt update
sudo apt install -y git nginx
sudo mkdir -p /var/www/utmaxs
sudo chown -R "$USER":"$USER" /var/www/utmaxs
rm -rf /var/www/utmaxs/*
tar -xzf /tmp/utmaxs-site.tar.gz -C /var/www/utmaxs
cd /var/www/utmaxs
npm install
npm run build
sudo cp deploy/nginx-utmaxs.conf /etc/nginx/sites-available/utmaxs
sudo ln -sfn /etc/nginx/sites-available/utmaxs /etc/nginx/sites-enabled/utmaxs
sudo nginx -t
sudo systemctl reload nginx
echo "UTMAXS deployed: http://www.utmaxs.com"
'@

$remote | ssh -i $KeyPath -p $Port "${User}@${HostName}" "bash -s"
