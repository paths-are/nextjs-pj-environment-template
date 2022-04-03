# 初期設定
git config --local --list
git config --local user.name "ユーザーネーム"
git config --local user.email "メールアドレス"

# PUSH
GIT_SSH_COMMAND='ssh -i ~/.ssh/id_ed25519_private_account' git push -u origin main
