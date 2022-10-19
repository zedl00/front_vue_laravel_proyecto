<template>
  <div class="card">
    <!-- Nuevo Usuario (Dialog) -->
    <Button label="Crear Usuario" icon="pi pi-external-link" @click="openModalUsuario" />
    <Dialog header="Crear Usuario" v-model:visible="displayModalUsuario" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :modal="true" class="p-fluid">

      <div class="field">
        <label for="nom">Nombre</label>
        <InputText type="name" id="nom" v-model="usuario.name" />
      </div>

      <div class="field">
        <label for="e">Correo Electronico</label>
        <InputText type="email" v-model="usuario.email" />
      </div>

      <div class="field">
        <label for="pass">Password</label>
        <InputText type="password" v-model="usuario.password" />
      </div>

      <template #footer>
        <Button label="Cerrar" icon="pi pi-times" @click="closeModalUsuario" class="p-button-text"/>
        <Button label="Guardar" icon="pi pi-check" @click="guardarUsuario" autofocus />
      </template>
    </Dialog>

    <!-- Lista Usuario (Table) -->
    <div>
      <ProgressBar mode="indeterminate" style="height: .5em" v-if="cargando" />
      <br>
      <DataTable :value="usuarios" responsiveLayout="scroll">
        <Column field="id" header="ID"></Column>
        <Column field="name" header="NOMBRE"></Column>
        <Column field="email" header="CORREO ELECTRONICO"></Column>
        <Column field="created_at" header="CREADO EN"></Column>
      </DataTable>
      <!-- <pre>{{ usuarios }}</pre> -->
    </div>

  </div>
</template>

<script>
import { ref, onMounted } from "vue"
import usuarioService from "@/service/UsuarioService"

export default {
  setup() {
    // Instanciar Modulos

    // Crear Variables (ref)
    const usuarios = ref([])
    const cargando = ref(false)
    const usuario = ref({})
    const displayModalUsuario = ref(false)

    // Eventos onMounted
    onMounted(() => {
      listarUsuarios()
    });

    // Metodos
    const listarUsuarios = async () => {
      cargando.value = true

      const { data } = await usuarioService.indexUsuario();
      usuarios.value = data

      cargando.value = false
    }

    const guardarUsuario = async () => {
      await usuarioService.storeUsuario(usuario.value);

      listarUsuarios()
      closeModalUsuario()
    }

    const openModalUsuario = () => {
      displayModalUsuario.value = true;

    }

    const closeModalUsuario = () => {
      displayModalUsuario.value = false;
    }

    // Return Objetos {variables, metodos, etc}
    return {
      usuarios,
      cargando,
      usuario,
      guardarUsuario,
      displayModalUsuario,
      openModalUsuario,
      closeModalUsuario

    }
  }


}
</script>

<style>

</style>