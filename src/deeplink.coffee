hash = null
module.exports =
  init: ()->
    hash = location.hash
  set: (item)->
    try
      if item.hash
        location.hash = item.hash
      else
        location.hash = if hash then hash else ''
  reset: ->
    try
      location.hash = hash if hash
    hash = null
