# Screenshots

 &nbsp;|<%= Object.keys(screens).join('|') %>
:---:|<%= Object.keys(screens).map(()=>':---:').join('|') %>
&nbsp;<% for(screen in screens) { %>|<%= screens[screen][0] %>&times;<%= screens[screen][1] %><% } %>
<% for(theme in themes) { %><%= theme %><% for(screen in screens) { %>|[<%= screen %>-<%= theme %>](./<%= files[theme][screen] %>)<% } %>
<% } %>

|#|Name|
|---:|:---|
<% shots.forEach((v, i)=>{%>|<%= i+1 %>|[<%= v %>](./<%= (i+1) < 10 ? '0' + (i+1) : (i+1) %>_<%= v %>.md)|
<%}) %>
