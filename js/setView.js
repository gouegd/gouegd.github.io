define(["lodash","rsvp","api","ractive","leaflet","text!templates/set.html"],function(t,e,n,r,o,a){return{init:function(t,e){var o;return o=new r({el:"set",template:a}),n.getSet(t).then(function(t){return o.set({set:t.photoset}),o.on("back",function(){return o.teardown(),e.setRoute("/")})})}}});