define(["lodash","rsvp","api","ractive","leaflet","text!templates/sets.html"],function(t,e,o,n,r,a){return{init:function(){var i,l,s,c,u,d,m;return s=/^LL:(-?[\d\.]+),\s?(-?[\d\.]+)/,i=[-41.29225,-185.22537],l="New Zealand",m=new n({el:"sets",template:a}),c=r.map("map",{zoomControl:!1}),c.setView(i,4),r.tileLayer("http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png",{attribution:'<a href="http://openstreetmap.org">OSM</a> | <a href="http://cloudmade.com">CloudMade</a>',maxZoom:16,key:"de8efc7432d34bb6ae69673b27cf52f3",styleId:"114653"}).addTo(c),u=null,d=function(t){return t?(u?u.setLatLng(t):u=r.circleMarker(t,{color:"red",radius:8,weight:1,fill:!1,opacity:1}),u.addTo(c)):(c.removeLayer(u),u=null,void 0)},e.hash({collections:o.getCollections(),sets:o.getSets()}).then(function(e){var o,n;return o=t.find(e.collections.collections.collection,function(t){return t.title===l}),n=o.set.reverse(),t.each(n,function(o){var n,r,a,i;return a=t.find(e.sets.photosets.photoset,function(t){return t.id===o.id}),a&&(o.img=a.primary_photo_extras.url_s),i=s.exec(o.description),i&&(n=+i[1],r=+i[2],!Number.isNaN(n||Number.isNaN(r)))?o.latlon=[n,r]:void 0}),m.set({sets:n,notEmpty:function(t){return null!=t?t.length:void 0}}),m.on("locate",function(t){var e;return e=this.get(t.keypath).latlon,d(e)}),m.on("go",function(t){var e,o;return e=this.get(t.keypath).latlon,o=c.getZoom(),c.setZoomAround(e,9,{animate:!0})}),console.dir(m)})}}});