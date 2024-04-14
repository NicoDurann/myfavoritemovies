const app = Vue.createApp({
  data() {
    return {
      pelicula: "",
      cantidad: 0,
      peliculas: [
        {
          titulo: "Interestelar",
          favorito: true,
        },
        {
          titulo: "El Padrino",
          favorito: false,
        },
      ],
    };
  },
  mounted() {
    // Obtener las peliculas del localStorage
    const peliculas = localStorage.getItem("peliculas");
    if (peliculas) {
      this.peliculas = JSON.parse(peliculas);
    }
  },

  // Metodos
  methods: {
    eliminarPelicula(index) {
      // Eliminar la pelicula del array
      this.peliculas.splice(index, 1);
      this.guardarTareas();
    },

    favoritoPelicula(task) {
      // Cambiar el estado de la pelicula
      task.favorito = !task.favorito;
      this.ordenarPeliculas();
      this.guardarTareas();
    },

    agregarPelicula() {
      // Validar que la pelicula no este vacia
      if (this.pelicula.trim() == "") {
        return;
      }

      // Agregar la pelicula al array de peliculas
      this.peliculas.push({
        titulo: this.pelicula,
        favorito: false,
      });

      // Limpiar el input
      this.pelicula = "";
      this.guardarTareas()
    },

    ordenarPeliculas() {
      // Ordenar las peliculas por favorito
      const comparar = (a, b) => {
        // Si 'a' es favorito y 'b' no, 'a' va antes que 'b'
        if (a.favorito && !b.favorito) {
          return -1;
        }
        // Si 'b' es favorito y 'a' no, 'b' va antes que 'a'
        else if (!a.favorito && b.favorito) {
          return 1;
        }
        // Si ambos son favoritos o no favoritos, no cambian de orden
        else {
          return 0;
        }
      };

      // Ordenar el arreglo de películas usando la función de comparación
      this.peliculas.sort(comparar);
    },

    guardarTareas() {
      // Guardar las peliculas en el localStorage
      localStorage.setItem("peliculas", JSON.stringify(this.peliculas));
    }
  },
});

app.mount("#app");
