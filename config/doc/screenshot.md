# <%= shot.title %> <small>#<%= index + 1 %></small>

[Next](./<%= ((index+1)%shots.length+1) < 10 ? '0' + ((index+1)%shots.length+1) : ((index+1)%shots.length+1) %>_<%= shots[(index + 1) % shots.length].title %>.md) &mdash; <% shots.forEach((v, i) => { if(i !== index) { %>[<%= i+1 %>](./<%= (i+1) < 10 ? '0' + (i+1) : (i+1) %>_<%= v.title %>.md) <% } else { %><%= index + 1 %> <% } }) %>

<% for(screen in screens) { %><% for(theme in themes) { %>![](./images/<%= theme %>_<%= screen %>_<%= (index+1) < 10 ? '0' + (index+1) : (index+1) %>_<%= shot.title %>.png)<% } %><% } %>

[Next](./<%= ((index+1)%shots.length+1) < 10 ? '0' + ((index+1)%shots.length+1) : ((index+1)%shots.length+1) %>_<%= shots[(index + 1) % shots.length].title %>.md) &mdash; <% shots.forEach((v, i) => { if(i !== index) { %>[<%= i+1 %>](./<%= (i+1) < 10 ? '0' + (i+1) : (i+1) %>_<%= v.title %>.md) <% } else { %><%= index + 1 %> <% } }) %>
