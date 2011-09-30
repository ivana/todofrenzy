Todaslistas::Application.routes.draw do
  
  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  config = Todaslistas::Application.config
  twitter = config.twitter_login.login_handler(:return_to => '/')
  mount twitter => 'login', :as => :twitter_login

  # Named routes
  # This route can be invoked with purchase_url(:id => product.id)
  match 'logout' => 'sessions#logout', :as => :logout
  match 'about' => 'todo_lists#about', :as => :about

  # Resource routes
  resources :items do
    collection do
      put :sort
    end
  end

  resources :todo_lists do
    member do
      put :clear
    end
    collection do
      put :sort
    end
  end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  root :to => "todo_lists#index"

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id(.:format)))'
end
