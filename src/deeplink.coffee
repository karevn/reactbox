hash = null
module.exports =
  init: ()->
    hash = location.hash if location.hash
  set: (item)->
    try
      if item.hash
        location.hash = item.hash
      else
        location.hash = if hash then hash else ''
  reset: ->
    try
      if hash
        location.hash = hash
      else
        location.hash = ''
    hash = null
