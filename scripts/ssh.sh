# SSH into the remote server

# Check if .env file exists
if [ ! -f ./.env ]; then
  echo ".env file not found! Please create one with the necessary variables."
  exit 1
fi

echo "Loading environment variables from .env file..."
source ./.env

echo "Environment variables loaded:"
echo $SSH_HOST_IP
echo $SSH_USER
echo $SSH_KEY_PATH

echo "Setting permissions for SSH key..."
chmod 600 $SSH_KEY_PATH

echo "Connecting to the server..."
ssh -i $SSH_KEY_PATH $SSH_USER@$SSH_HOST_IP
