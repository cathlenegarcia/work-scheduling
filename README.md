# Work Order Scheduling

This is a simple work scheduling website. A list of technicians, locations, and work orders are uploaded and saved into a PostgreSQL database.
When a blank cell is clicked, an alert would show up indicating the available time between the previous and next work orders.

It currently only supports work schedules from a common date.

I used table from Bootstrap to simplify formatting the data. 

Here are the list of improvements that I recommend for the future:
- Date selection to list the work orders according to date
- Merging cells that are clickable
- Appropriate scaling for the time covered on a work order

## Dependencies and Installation

This application requires you to install the following dependencies:
- [Ruby v2.6.0](https://www.ruby-lang.org/en/downloads/)
- [Bundler v1.17.2](https://bundler.io/)
- [Rails v6.0.3.2] (https://edgeguides.rubyonrails.org/6_0_release_notes.html)
- PostgreSQL v11.8
- [Bootstrap v4.3] (https://gorails.com/forum/install-bootstrap-with-webpack-with-rails-6-beta)

Here is a guide for installing the dependencies stated above, refer to the documentations linked above when you encounter problems in installing.

- Install Homebrew (if you haven't already)
  ```
  $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  ```

- Install RVM (this takes a while)
  ```
  $ echo "gem: --no-document" >> ~/.gemrc
  $ curl -L https://get.rvm.io | bash -s stable --auto-dotfiles --autolibs=enable --rails
  $ rvm install 2.6.0
  $ rvm use 2.6.0 --default
  ```

- Install PostgreSQL
  ```
  $ brew install postgres
  $ brew tap homebrew/services
  $ brew services start postgresql
  ```

- Clone repository
  ```
  $ git clone https://github.com/cathlenegarcia/work-scheduling.git
  $ cd work-scheduling
  ```

- Configure App (see [Configuration](#configuration))

- Setup PostgreSQL vagrant user
  ```
  $ createuser --pwprompt --interactive scheduling # use password 'scheduling'
  ```

- Install the rest of the required gems
  ```
  $ bundle install
  ```
  
- Install bootstrap
  ```
  yarn add bootstrap@4.3.1 jquery popper.js
  ```

- Setup database
  ```
  $ bundle exec rails db:setup   # if database does not exist
  $ bundle exec rails db:migrate # if database already exists
  ```
  
  
## Run Rails

```
$ bundle exec rails s
```

- App will be accessible via `localhost:3000`

### <a name="configuration"></a>Configuration
__config/database.yml__

- Create the application config file (`config/database.yml`).
- Refer to the table below for the configuration details

    | Field                       | Description                               |
    | ----------------------------| ------------------------------------------|
    | `adapter`                   | Database adapter                          |
    | `encoding`                  | Database encoding                         |
    | `pool`                      | Number of thread access to DB connections |
    | `timeout`                   | Database timeout (in milliseconds)        |
    | `host`                      | Database host                             |
    | `username`                  | Database credential                       |
    | `password`                  | Database credential                       |
    
    
## Upload CSV files into the Application

Run the following to upload the CSV files. Make sure that the files are located in the root directory of the project.
```
bundle exec rake import:technicians['<filename>']
bundle exec rake import:locations['<filename>']
bundle exec rake import:work_orders['<filename>']
```
