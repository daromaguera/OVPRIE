<script setup lang="ts">
import { ref, reactive } from "vue";

const items = ref([
    { title: "+ Add" },
    { title: "Customize Table" },
    { title: "Add Column" },
]);
const initialState = {
    name: '',
    email: '',
    select: null,
    checkbox: null,
  }

const state = reactive({
    ...initialState,
})
</script>

<template>
    <v-row>
        <v-col cols="12" sm="12" lg="12">
            <v-card elevation="10">
                <v-card-item>
                    <div class="d-flex align-center justify-space-between">
                        <div>
                            <h5 class="text-h5 mb-1 font-weight-semibold"></h5>
                        </div>
                        <div class="d-flex gap-2 align-center w-50">
                            <v-text-field
                                prepend-inner-icon="mdi-magnify"
                                v-model="state.name"
                                label="Search"
                                required
                                class="w-100 mt-6 mr-4"
                            ></v-text-field>
                            <v-menu bottom left class="mr-4">
                                <template v-slot:activator="{ props }">
                                    <v-btn icon color="inherit" v-bind="props" flat>
                                        <DotsVerticalIcon stroke-width="1.5" size="24" class="text-grey100" />
                                    </v-btn>
                                </template>
                                <v-list density="compact">
                                    <v-list-item v-for="(item, i) in items" :key="i" :value="i">
                                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </div>
                    </div>

                    <v-row>
                        <v-col cols="12" class="pt-7">
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                        </v-col>
                    </v-row>
                </v-card-item>
            </v-card>
        </v-col>
    </v-row>
</template>