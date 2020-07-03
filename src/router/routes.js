import Login from "@/views/auth/Login";
import Register from "@/views/auth/Register";
import AuthRoot from "@/views/AuthRoot";
import store from "@/store";

const routes = [
  {
    path: '/',
    name: 'auth-root',
    component: AuthRoot,
    children: [
      {
        path: 'login',
        name: 'login',
        component: Login,
        meta: {
          public: true,
          onlyGuest:true
        }
      },
      {
        path: 'register',
        name: 'register',
        component: Register,
        meta: {
          public: true,
          onlyGuest:true
        }
      },
    ]
  },
  {
    path: '/app',
    name: 'root',
    component: () => import(/* webpackChunkName: "root" */ "@/views/Root.vue"),
    redirect: { name: 'translation-list' },
    children: [
      {
        path: 'translation/',
        name: 'translation-list',
        component: () => import(/* webpackChunkName: "translation-list" */ "@/views/translation/TranslationList.vue"),
      },
      {
        path: 'translation/create',
        name: 'translation-create',
        component: () => import(/* webpackChunkName: "translation-form" */ "@/views/translation/TranslationForm.vue"),
      },
      {
        path: 'translation/edit/:id',
        name: 'translation-edit',
        props: true,
        component: () => import(/* webpackChunkName: "translation-form" */ "@/views/translation/TranslationForm.vue"),
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