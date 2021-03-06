define ['lodash', 'rsvp', 'api', 'ractive', 'leaflet', 'text!templates/sets.html'],
(_, rsvp, api, R, leaflet, t_sets) ->
  {
    NZ_SETNAME: 'New Zealand'
    RE_LL : /^LL:(-?[\d\.]+),\s?(-?[\d\.]+)/
    NZ_LATLON : [-41.29225, -185.22537]

    # Once only as we will not dump this main view
    init: _.once (router) ->
      sets = new R
        el: 'sets'
        template: t_sets

      map = leaflet.map 'map', zoomControl: false
      map.setView @NZ_LATLON, 4
      leaflet.tileLayer 'http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png',
        attribution: '<a href="http://openstreetmap.org">OSM</a> | <a href="http://cloudmade.com">CloudMade</a>'
        maxZoom: 16
        key: 'de8efc7432d34bb6ae69673b27cf52f3'
        styleId: '114653'
      .addTo map

      marker = null
      moveMap = (latlon) ->
        unless latlon
          map.removeLayer marker
          marker = null
          return
        
        if marker
          marker.setLatLng latlon
        else
          marker = leaflet.circleMarker latlon,
            color: 'red'
            radius: 8
            weight: 1
            fill: false
            opacity: 1
        marker.addTo map

      rsvp.hash
        collections: api.getCollections()
        sets: api.getSets()
      .then (promises) =>

        kiwiCollection = _.find promises['collections'].collections.collection, (collection) =>
          collection.title is @NZ_SETNAME

        kiwiSets = kiwiCollection.set.reverse();

        _.each(kiwiSets, (set) =>
          photoset = _.find promises['sets'].photosets.photoset,
            (photoset) -> photoset.id is set.id

          if photoset
            set.img = photoset.primary_photo_extras.url_s

          result = @RE_LL.exec set.description
          unless result
            return

          lat = +result[1]
          lon = +result[2]
          if Number.isNaN lat or Number.isNaN lon
            return

          set.latlon = [lat, lon]
        );

        sets.set
          sets: kiwiSets
          notEmpty: (arr) -> arr?.length

        sets.on 'locate', (event) ->
          latlon = @get(event.keypath).latlon;
          moveMap latlon

        sets.on 'go', (event) ->
          id = @get(event.keypath).id
          router.setRoute '/set/'+id

        console.dir sets
  }
  
  