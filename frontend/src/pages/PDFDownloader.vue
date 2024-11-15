<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-5" outlined>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                v-model="equationCount"
                label="Number of Equations"
                type="number"
                :rules="[v => !!v || 'Number of equations is required',
                  v => v > 0 || 'Number of equations must be greater than 0'
                ]"
                required
              ></v-text-field>
              <v-btn color="primary" @click="downloadPDF">Generate PDF</v-btn>
            </v-form>
            <div class="pt-5" v-if="pdfUrl">
              <iframe :src="pdfUrl" width="100%" height="700px"></iframe>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      equationCount: 10,
      pdfUrl: null
    };
  },
  methods: {
    async downloadPDF() {
      if(this.$refs.form.validate() && this.equationCount > 0){
        try {
          const response = await axios.get(`http://localhost:4567/generate_equations`, {
            params: { count: this.equationCount },
            responseType: 'blob'
          });
          const blob = new Blob([response.data], { type: 'application/pdf' });
          this.pdfUrl = URL.createObjectURL(blob);
        } catch (error) {
          console.error('Error generating PDF:', error);
        }
      }
    }
  }
};
</script>