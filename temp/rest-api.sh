#curl -X PUT \
#  -H "X-Parse-Application-Id: 8FKZ27U00eOBZM4TLdilCg6yYfR8InLltcnjidEj" \
#  -H "X-Parse-REST-API-Key: MHFdMgOlQHadrc0dWN0gYGfP4itl6ulRQ7XQ6W6L" \
#  -H "Content-Type: application/json" \
#  -d '{
#        "picture": {
#          "name": "tfss-a3cc3350-9de2-4760-9883-42de5d59fdd1-pic.jpg",
#          "__type": "File"
#        }
#      }' \
#  https://api.parse.com/1/classes/GameScore/GvQKD9Yepw

curl -X POST \
  -H "X-Parse-Application-Id: 8FKZ27U00eOBZM4TLdilCg6yYfR8InLltcnjidEj" \
  -H "X-Parse-REST-API-Key: MHFdMgOlQHadrc0dWN0gYGfP4itl6ulRQ7XQ6W6L" \
  -H "Content-Type: application/json" \
  -d '{
      }' \
  https://api.parse.com/1/events/AppOpened
