# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_todofrenzy_session',
  :secret      => 'bd4d05d8d0f3b08c68c8ace012e04ddd87bd9d1039167d457237d79ffec2fce0f92c6c4b974647ecaa2ede334b741a8e62cfc1ffbe4ec959154cd2a6f8516f1c'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
