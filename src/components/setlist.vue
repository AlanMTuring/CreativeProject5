<template>
    <div id="main">
        <h1 style="text-align: center; margin-top: 160px; font-size: 45px;">Set-Lists</h1>
        <p style="text-align: center; font-size: 25px; margin: auto 300px;">
            We want to play what you want us to! To give a suggestion, just put the song title and the artist in the boxes and hit add.
        </p>
        <p style="text-align: center; font-size: 20px;">
            The 'Wedding Set-List' is Blake and Kalin's standard setlist, but can be changed for individual weddings. Send them a message from the 'Contact' tab for your unique playlist.
        </p>
        <div class="container">
            <div class="wedding-setlist">
                <h2 style="text-align: center;">Wedding Set-List</h2>
                <ol>
                    <li><p>1234 - Plain White T's</p></li>
                    <li><p>Rhythm of Love - Plain White T's</p></li>
                    <li><p>Can't Help Falling in Love - Evlis Presley</p></li>
                    <li><p>I Won't Give Up - Jason Mraz</p></li>
                    <li><p>Lucky - Jason Mraz</p></li>
                    <li><p>I'm Yours - Jason Mraz</p></li>
                    <li><p>Like I'm Gonna Lose You - Meghan Trainor</p></li>
                    <li><p>All of Me - John Legend</p></li>
                    <li><p>Drops of Jupiter - Train</p></li>
                    <li><p>Marry Me - Train</p></li>
                    <li><p>Photograph - Ed Sheeran</p></li>
                    <li><p>Perfect - Ed Sheeran</p></li>
                    <li><p>Thinking Out Loud - Ed Sheeran</p></li>
                    <li><p>Can't Keep My Eyes Off of You - Frankie Valli</p></li>
                    <li><p>A Thousand Years - Christina Perri</p></li>
                    <li><p>Never Stop - SafetySuit</p></li>
                    <li><p>Say You Won't Let Go - James Arthur</p></li>
                    <li><p>Just the Way You Are - Bruno Mars</p></li>
                    <li><p>Bubbly - Colbie Caillet</p></li>
                    <li><p>Bless The Broken Road - Rascal Flatts</p></li>
                    <li><p>Better Together - Jack Johnson</p></li>
                    <li><p>She is Love - Parachute</p></li>
                    <li><p>The Way You Look Tonight - Fred Astaire</p></li>
                    <li><p>You and Me - Lifehouse</p></li>
                    <li><p>Two Little Words - Rueben Koops</p></li>
                    <li><p>Loving You Tonight - Andrew Allen</p></li>
                </ol>
            </div>
            <div class="wedding-setlist">
                <h2>Suggestions</h2>
                <div v-if="loggedIn">
                    <!-- <button><a @click="logout" href="#/setlist">Logout</a></button> -->
                    <button @click="logout" id="notRegister">Logout</button>
                    <form v-on:submit.prevent="addSong">
                        Song Title: <input type="text" v-model="title"><br>
                        Artist: <input type="text" v-model="artist"><br>
                        <button type="submit">Add</button>
                      </form>
                      <ul>
                        <li v-for="song in songs"> <!-- draggable="true" v-on:dragstart="dragSong(song)" v-on:dragover.prevent v-on:drop="dropSong(song)" -->
                        <!-- <label>{{ song.title }} - {{ song.artist }}</label> -->
                          <label>{{ song.song }}</label><button v-on:click="deleteSong(song)" class="delete">X</button>
                        </li>
                      </ul>
                </div>
                <div v-else>
                  <form v-on:submit.prevent="login">
                    <input v-model="email" placeholder="Email Address">
                    <input v-model="password" type="password" placeholder="Password">
                    <button class="primary" type="submit">Login</button>
                  </form>
                  <div class="flexWrapper errorPlace">
                    <p v-if="loginError" class="flexRight error">{{loginError}}</p>
                  </div>
                  <p>or</p>
                  <div>
                      <form v-on:submit.prevent="register">
                        <p>1. Choose a user name</p>
                        <input class="narrow" v-model="username" placeholder="User Name">
                        <p>2. Create an account.</p>
                        <input class="wide" v-model="name" placeholder="First and Last Name"><br/>
                        <input class="narrow" v-model="email" placeholder="Email Address">
                        <input class="narrow" type="password" v-model="password" placeholder="Password">
                        <button class="alternate" type="submit">Register</button>
                      </form>
                      <p class="error">{{registerError}}</p>
                  </div>
                </div>
            </div>
        </div>
        <!-- <div id="myModal" class="modal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <form v-on:submit.prevent="register">
                  <p>1. Choose a user name</p>
                  <input class="narrow" v-model="username" placeholder="User Name">
                  <p>2. Create an account.</p>
                  <input class="wide" v-model="name" placeholder="First and Last Name"><br/>
                  <input class="narrow" v-model="email" placeholder="Email Address">
                  <input class="narrow" type="password" v-model="password" placeholder="Password">
                  <button class="alternate" type="submit">Register</button>
                </form>
                <p>{{ response }}</p>
            </div>
        </div> -->
    </div>
</template>


<script>
window.onload = function() { 
    // Get the modal
    var modal = document.getElementById('myModal');
    // Get the button that opens the modal
    var btn = document.getElementById("registerButton");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks on the button, open the modal 
    btn.onclick = function() {
      modal.style.display = "block";
    }
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
export default {
  name: 'Setlist',
  data () {
    return {
      //songs: [],
      title: '',
      artist: '',
      //drag: {},
      username: '',
      email: '',
      password: '',
      name: '',
      response: '',
    }
  },
  created: function() {
    this.$store.dispatch('getUserSongs',{id:this.$route.params.userID});
  },
  computed: {
    songs: function() {
      return this.$store.getters.songs;
    },
    loggedIn: function() {
      return this.$store.getters.loggedIn;
    },
    loginError: function() {
      return this.$store.getters.loginError;
    },
    registerError: function() {
      return this.$store.getters.registerError;
    }
  },
  methods: {
    addSong: function() {
      this.$store.dispatch('addSong',{
        song: this.title + " - " + this.artist,
      }).then(song => {
        this.title = "";
        this.artist = "";
      });
    },
    logIn: function() {
      return this.$store.getters.loggedIn;
    },
    registerError: function() {
      return this.$store.getters.registerError;
    },
    loginError: function() {
      return this.$store.getters.loginError;
    },
    // myFunction: function() {
    //   return 0;
    // },
    register: function() {
        this.$store.dispatch('register',{
            username: this.username,
            email: this.email,
            password: this.password,
            name: this.name,
        });
        //setTimeout(myFunction, 2000);
        if (this.logIn()) {
          console.log("LOGGED IN");
          this.response = "Account registered. You are now logged in.";
        }
        else {
          console.log("NOT LOGGED IN");
          this.response = this.registerError();
        }
    },
    login: function() {
      this.$store.dispatch('login',{
        email: this.email,
        password: this.password,
      }).then(user => {
        this.email = '';
        this.password = '';
      });
    },
    logout: function() {
        this.$store.dispatch('logout');
    },
    deleteSong: function(song) {
      this.$store.dispatch('deleteSong', song);
      // axios.delete("http://165.227.16.199:3002/api/songs/" + song.id).then(response => {
      //   this.getSongs();
      //   this.response = '';
      //   return true;
      // }).catch(err => {
      // });
    },
    // dragSong: function(song) {
    //   this.drag = song;
    // },
    // dropSong: function(song) {
    //   axios.put("http://165.227.16.199:3002/api/songs/" + this.drag.id, {
    //     title: this.drag.title,
    //     artist: this.drag.artist,
    //     orderChange: true,
    //     orderTarget: song.id
    //   }).then(response => {
    //     this.getSongs();
    //     return true;
    //   }).catch(err => {
    //   });
    // },
  }
}
</script>



<style scoped>
#main {
  font-family: 'Pacifico', cursive;
}
.container {
    margin: 0;
    display: flex;
    justify-content: center;
    /* align-items: center; */
    flex-direction: row;
}

ol {
  list-style-type: none;
  -moz-column-count: 2;
  -moz-column-gap: 20px;
  -webkit-column-count: 2;
  -webkit-column-gap: 20px;
  column-count: 2;
  column-gap: 20px;
}

.delete {
  margin-left: 5px;
}

.editing {
  display: block;
}

.wedding-setlist {
    margin: 0 30px 0 30px;
}

#myBtn {
     background:none!important;
     color:inherit;
     border:none; 
     padding:0!important;
     font: inherit;
     /*border is optional*/
     /* border-bottom:1px solid #444;  */
     /* cursor: pointer; */
}

/* The Modal (background) */
.modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */
    text-align: center;
}

/* The Close Button */
.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

.errorPlace {
    height: 20px;
}
</style>
