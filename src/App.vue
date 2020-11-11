<template>
<v-app>
    <v-app-bar app color="primary" dark>
        <div class="d-flex align-center">
            <h3>KORN CHOTPITAKKUL</h3>
        </div>

        <v-spacer></v-spacer>

        <v-btn href="https://github.com/KornCode/ShippopTaskSorting" target="_blank" text>
            <span class="mr-1">GITHUB</span>
            <v-icon>mdi-github</v-icon>
        </v-btn>

        <v-divider inset vertical></v-divider>

        <v-btn href="https://www.facebook.com/korn.chotpitakkul/" target="_blank" text>
            <span class="mr-1">FACEBOOK</span>
            <v-icon>mdi-facebook</v-icon>
        </v-btn>
    </v-app-bar>

    <v-main>
        <router-view />
    </v-main>
</v-app>
</template>

<script>
export default {
    name: "App",
};
</script>
