# Screenshots

 &nbsp;|<%= Object.keys(screens).join('|') %>
:---:|<%= Object.keys(screens).map(()=>':---:').join('|') %>
&nbsp;<% for(screen in screens) { %>|<%= screens[screen][0] %> &times; <%= screens[screen][1] %><% } %>
<% for(theme in themes) { %><%= theme %><% for(screen in screens) { %>|[<%= screen %> / <%= theme %>](./<%= files[theme][screen] %>)<% } %>
<% } %>
