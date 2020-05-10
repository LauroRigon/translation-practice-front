import Login from "@/views/auth/Login";
import Register from "@/views/auth/Register";
import store from "@/store";

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      public: true,
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      public: true,
    }
  },
  {
    path: '/',
    name: 'root',
    component: () => import(/* webpackChunkName: "root" */ "@/views/Root.vue"),
    children: [
      {
        path: 'translation/',
        name: 'translation-list',
        component: () => import(/* webpackChunkName: "translation-list" */ "@/views/translation/TranslationList.vue"),
      },
      {
        path: 'translation/:id',
        name: 'translation-show',
        props: true,
        component: () => import(/* webpackChunkName: "translation-show" */ "@/views/translation/TranslationShow.vue"),
        beforeEnter: (routeTo, routeFrom, next) => {
          let translationId = routeTo.params.id;
          store.fetchTranslation(translationId)
            .then(response => {
              routeTo.params.translation = response.data;
              next();
            })
            .catch(() => {
              store.addNotification({ type: 'danger', title: 'Opss', message: 'Deu ruim ao recuperar a Translation' });
            });
        }
      },
    ]
  },

];


export default routes;