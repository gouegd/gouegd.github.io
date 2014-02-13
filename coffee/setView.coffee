define ['lodash', 'rsvp', 'api', 'ractive', 'leaflet', 'text!templates/set.html'],
(_, rsvp, api, R, leaflet, t_set) ->
  {
    init: (id, router) ->
      set = new R
        el: 'set'
        template: t_set

      api.getSet(id).then (setData) ->
        set.set
          set: setData.photoset

        set.on 'back', (event) ->
          set.teardown()
          router.setRoute '/'
  }