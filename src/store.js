import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {},
        loggedIn: false,
        loginError: '',
        registerError: '',
        songs: [],
        //drag: {},
        // feed: [],
        // userView: [],
        // feedView: [],
        // following: [],
        // followers: [],
    },
    getters: {
        user: state => state.user,
        loggedIn: state => state.loggedIn,
        loginError: state => state.loginError,
        registerError: state => state.registerError,
        songs: state => state.songs,
        //drag: state => state.drag,
        // feed: state => state.feed,
        // feedView: state => state.feedView,
        // userView: state => state.userView,
        // following: state => state.following,
        // followers: state => state.followers,
        // isFollowing: state => (id) => {
        //     return state.following.reduce((val,item) => {
        //         if (item.id === id)
        //             return true;
        //         else
        //             return val;
        //     },false);
        // },
    },
    mutations: {
        setUser (state, user) {
            state.user = user;
        },
        setLogin (state, status) {
            state.loggedIn = status;
        },
        setLoginError (state, message) {
            state.loginError = message;
        },
        setRegisterError (state, message) {
            state.registerError = message;
        },
        setSongs (state, songs) {
            state.songs = songs;
        },
        // setFeed (state, feed) {
        //     state.feed = feed;
        // },
        // setUserView (state, user) {
        //     state.userView = user;
        // },
        // setFeedView (state, feed) {
        //     state.feedView = feed;
        // },
        // setFollowing (state, following) {
        //     state.following = following;
        // },
        // setFollowers (state, followers) {
        //     state.followers = followers;
        // },
    },
    actions: {
        // Registration, Login //
        register(context,user) {
            console.log("We're registering in the store");
            axios.post("/api/users",user).then(response => {
                context.commit('setUser', response.data.user);
                context.commit('setLogin',true);
                context.commit('setRegisterError',"");
                context.commit('setLoginError',"");
                return context.dispatch('getUserSongs',{user:context.state.user});
            }).catch(error => {
                context.commit('setLoginError',"");
                context.commit('setLogin',false);
                if (error.response) {
                    if (error.response.status === 403)
                    context.commit('setRegisterError',"That email address already has an account.");
                    else if (error.response.status === 409)
                    context.commit('setRegisterError',"That user name is already taken.");
                    return;
                }
                context.commit('setRegisterError',"Sorry, your request failed. We will look into it.");
            });
        },
        login(context,user) {
            axios.post("/api/login",user).then(response => {
                context.commit('setUser', response.data.user);
                context.commit('setLogin',true);
                context.commit('setRegisterError',"");
                context.commit('setLoginError',"");
                return context.dispatch('getUserSongs',{user:context.state.user});
            }).catch(error => {
                context.commit('setRegisterError',"");
                if (error.response) {
                    if (error.response.status === 403 || error.response.status === 400)
                    context.commit('setLoginError',"Invalid login.");
                    context.commit('setRegisterError',"");
                    return;
                }
                context.commit('setLoginError',"Sorry, your request failed. We will look into it.");
            });
        },
        logout(context,user) {
            context.commit('setUser', {});
            context.commit('setLogin',false);
        },
        // songing //
        addSong(context,song) {
            axios.post("/api/users/" + context.state.user.id + "/songs",song).then(response => {
                return context.dispatch('getUserSongs',{user:context.state.user});
            }).catch(err => {
                console.log("addSong failed:",err);
            });
        },
        deleteSong(context,song) {
            axios.delete("/api/users/" + context.state.user.id + "/songs/" + song.id,song).then(response => {
                return context.dispatch('getUserSongs',context.state.user);
            }).catch(err => {
                console.log("deleteSong failed:",err);
            });
        },
        getUserSongs(context,user) {
            var userMan = user;
            if (user.user == undefined) {
                return axios.get("/api/users/" + user.id + "/songs").then(response => {
                    context.commit('setSongs',response.data.songs);
                }).catch(err => {
                    console.log("getUserSongs failed:",err);
                });
            }
            else {
                return axios.get("/api/users/" + user.user.id + "/songs").then(response => {
                    context.commit('setSongs',response.data.songs);
                }).catch(err => {
                    console.log("getUserSongs failed:",err);
                });
            }
        },
        // Users //
        // get a user, must supply {username: username} of user you want to get
        // getUser(context,user) {
        //     return axios.get("/api/users/" + user.id).then(response => {
        //         context.commit('setUserView',response.data.user);
        //     }).catch(err => {
        //         console.log("getUser failed:",err);
        //     });
        // },
        // get songs of a user, must supply {id:id} of user you want to get songs for
    }
});