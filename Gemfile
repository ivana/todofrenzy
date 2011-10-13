source 'http://rubygems.org'

gem 'rails', '~> 3.1.0'

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails', "  ~> 3.1.0"
  gem 'compass', '~> 0.12.alpha'
  gem 'coffee-rails', "~> 3.1.0"
  gem 'uglifier'
end

group :production do
  gem 'therubyracer-heroku', '~> 0.8.1.pre3', :require => nil
  gem 'pg'
end

gem 'jquery-rails'

gem 'twitter-login', '~> 0.4.2', :require => 'twitter/login'
gem 'choices'

group :development, :test do
  gem 'sqlite3-ruby', :require => 'sqlite3'
end
