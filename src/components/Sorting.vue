<template>
<v-container>
    <v-row class="text-center">
        <v-col class="mb-2">
            <h2 class="display-2 mb-3">
                Shippop
            </h2>

            <p class="subheading font-weight-regular">
                List Search Algorithms
            </p>
        </v-col>

        <v-col class="mb-2" cols="12">
            <v-row justify="center">
                <v-col cols="6">
                    <v-row justify="start">
                        <v-col cols="12">
                            <v-row align="center">
                                <v-col cols="3">
                                    <h3>List</h3>
                                </v-col>

                                <v-col cols="9">
                                    <v-text-field v-model="lists_input" label="Ex: 4, 6, 12, 9, 18, 44" required>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12">
                            <v-row align="center">
                                <v-col cols="3">
                                    <h3>Algorithm</h3>
                                </v-col>

                                <v-select v-model="algorithm_select" :items="algorithms" dense></v-select>
                            </v-row>
                        </v-col>
                        <v-col cols="12">
                            <v-row align="center">
                                <v-col cols="3">
                                    <h3>Search</h3>
                                </v-col>

                                <v-col cols="6">
                                    <v-text-field v-model="target_input" label="Ex: 9" type="number" required>
                                    </v-text-field>
                                </v-col>

                                <v-col cols="3">
                                    <v-btn @click="submit" :disabled="!allowSubmit" depressed block color="primary">
                                        Submit
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-col>

                <v-col cols="6">
                    <v-row justify="start">
                        <v-col cols="3">
                            <h3>Result</h3>
                        </v-col>

                        <v-col cols="9">
                            <v-card tile>
                                <v-list dense>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-title class="d-flex justify-space-between">
                                                <strong>List: </strong>
                                                <p v-if="lists_input.length" key="lists_input.length">
                                                    {{ lists }}
                                                </p>
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>

                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-title class="d-flex justify-space-between">
                                                <strong>Search: </strong>
                                                <p>{{ target_input }}</p>
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>

                                    <v-list-item v-for="([target, looking], index) in solutions" :key="index">
                                        <v-list-item-content>
                                            <v-list-item-title class="d-flex justify-start">
                                                <strong>
                                                    Round: {{ index + 1 }} ===> {{ target }} != {{ looking }}
                                                </strong>
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>

                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-title class="d-flex justify-start">
                                                <strong v-if="target_exist" key="target_exist">
                                                    Found !!
                                                </strong>
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-col>

        <v-snackbar v-model="snackbar">
            {{ snackbar_text }}

            <template v-slot:action="{ attrs }">
                <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </v-row>
</v-container>
</template>

<script>
const asc = (a, b) => a - b;

export default {
    name: "HelloWorld",

    data: () => ({
        lists_input: '',
        target_input: '',
        algorithm_select: '',

        algorithms: [
            'linear',
            'binary',
            'bubble'
        ],

        solutions: [],
        target_exist: false,

        snackbar: false,
        snackbar_text: '',
    }),

    computed: {
        lists() {
            return this.lists_input.replace(/[, ]+/g, " ").split(' ').map(Number);
        },

        allowSubmit() {
            return [
                this.lists_input,
                this.target_input,
                this.algorithm_select
            ].every(e => e !== '');
        }
    },

    methods: {
        submit() {
            this.solutions.length = 0;
            this.target_exist = false;

            const option = this.algorithm_select;

            if (option === 'linear') {
                [this.solutions, this.target_exist] = this.linear(this.lists, +this.target_input);
            } else if (option === 'binary') {
                [this.solutions, this.target_exist] = this.binary(this.lists, +this.target_input);
            } else {
                this.snackbar = true;
                this.snackbar_text = "Can't process the request of Bubble Sort";
            }
        },

        linear(lists, target) {
            const lookup_queue = [];
            let isMatched = false;

            for (const search of lists) {
                lookup_queue.push([target, search]);
                if (target === search) {
                    isMatched = true;
                    break;
                }
            }

            return [lookup_queue, isMatched];
        },

        binary(lists, target) {
            const lists_asc = [...lists].sort(asc);
            const lookup_queue = [];
            let isMatched = false;

            let high = lists_asc.length - 1;
            let low = 0;

            while (low <= high) {
                const mid = Math.floor((low + high) / 2);
                const search = lists_asc[mid];

                if (target === search) {
                    lookup_queue.push([target, search]);
                    isMatched = true;
                    break;
                }

                if (search < target) {
                    low = mid + 1;

                    lookup_queue.push([target, search]);
                } else {
                    high = mid - 1;

                    lookup_queue.push([target, search]);
                }
            }

            return [lookup_queue, isMatched];
        }
    }
};
</script>
