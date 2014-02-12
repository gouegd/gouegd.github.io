require ['domReady!', 'rsvp', 'setsView'],
(doc, rsvp, setsView) ->
  
  # Make errors on promises readable
  rsvp.on 'error', (event) ->
    console.error? 'Error in promise'
    console.dir? event

  setsView.init()