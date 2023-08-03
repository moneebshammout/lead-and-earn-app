// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs

Table user {
  id integer [primary key]
  name varchar [not null]
  email varchar [unique,not null]
  phone integer [unique,not null]
  birthdate date
  points integer
  image varchar
  created_at timestamp
  role varchar
  level_id integer
}

Table lead {
  id integer [primary key]
  referral_link integer
  refered_client integer
  // lead_owner integer
  created_at timestamp
}

Table referral_link {
  id integer [primary key]
  owner integer
  created_at timestamp
}

Table referral_view {
  id integer [primary key]
  viewer integer
  referral_link varchar
  created_at timestamp
}

Table lead_category {
  id integer [primary key]
  leads_from integer 
  leads_to integer 
  points integer
  created_at timestamp
}

Table level {
  id integer [primary key]
  badge varchar
  points_from integer 
  points_to integer 
  created_at timestamp
}


Ref: lead.referral_link > referral_link.id // many-to-one
// Ref: lead.lead_owner > user.id    //many-to-one

Ref: user.id - lead.refered_client  //one-to-one
Ref: user.id - referral_link.owner //one-to-one
Ref: user.level_id - level.id //one-to-one


Ref: referral_view.viewer > user.id    // many-to-one
Ref: referral_view.referral_link > referral_link.id  // many-to-one


