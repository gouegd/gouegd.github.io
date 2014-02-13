require ['domReady!', 'rsvp', 'setsView', 'setView'],
(doc, rsvp, setsView, setView) ->
  
  # Make errors on promises readable
  rsvp.on 'error', (event) ->
    console.error? 'Error in promise'
    console.dir? event

  routes =
    '/': () -> setsView.init router
    '/set/:setId': (id) ->
      console.log 'view set '+id
      setView.init id, router

  router = Router routes
  router.init()
  router.configure
    on: () -> console.info 'Accessing route '+window.location.hash
  # Lauch the main route
  router.setRoute '/'