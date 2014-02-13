define(["lodash","rsvp","api","ractive","leaflet","text!templates/sets.html"],function(t,e,o,n,r,i){return{NZ_SETNAME:"New Zealand",RE_LL:/^LL:(-?[\d\.]+),\s?(-?[\d\.]+)/,NZ_LATLON:[-41.29225,-185.22537],init:t.once(function(a){var l,s,c,u,d=this;return u=new n({el:"sets",template:i}),l=r.map("map",{zoomControl:!1}),l.setView(this.NZ_LATLON,4),r.tileLayer("http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png",{attribution:'<a href="http://openstreetmap.org">OSM</a> | <a href="http://cloudmade.com">CloudMade</a>',maxZoom:16,key:"de8efc7432d34bb6ae69673b27cf52f3",styleId:"114653"}).addTo(l),s=null,c=function(t){return t?(s?s.setLatLng(t):s=r.circleMarker(t,{color:"red",radius:8,weight:1,fill:!1,opacity:1}),s.addTo(l)):(l.removeLayer(s),s=null,void 0)},e.hash({collections:o.getCollections(),sets:o.getSets()}).then(function(e){var o,n;return o=t.find(e.collections.collections.collection,function(t){return t.title===d.NZ_SETNAME}),n=o.set.reverse(),t.each(n,function(o){var n,r,i,a;return i=t.find(e.sets.photosets.photoset,function(t){return t.id===o.id}),i&&(o.img=i.primary_photo_extras.url_s),a=d.RE_LL.exec(o.description),a&&(n=+a[1],r=+a[2],!Number.isNaN(n||Number.isNaN(r)))?o.latlon=[n,r]:void 0}),u.set({sets:n,notEmpty:function(t){return null!=t?t.length:void 0}}),u.on("locate",function(t){var e;return e=this.get(t.keypath).latlon,c(e)}),u.on("go",function(t){var e;return e=this.get(t.keypath).id,a.setRoute("/set/"+e)}),console.dir(u)})})}});