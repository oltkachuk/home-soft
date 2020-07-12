<template>
    <b-list-group class="sidebar">
      <router-link
       class="link"
       v-for="link in links"
       :key="link.url"

       active-class="active"
       tag="b-list-group-item"
       :to=link.url
       :exact=link.exact
      >{{link.title}}</router-link>

    </b-list-group>
</template>

<script>
export default {
  data: () => ({
    links: [
      {title: "Головна", url: "/", exact: true},
      {title: "Категорії", url: "/category"},
      {title: "Записи", url: "/record"},
      {title: "Історія", url: "/history"},
      {title: "Графік витрат", url: "/chart"}
    ]
  })
}
</script>