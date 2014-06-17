class Player < ActiveRecord::Base
    belongs_to :group

    has_many :playergames
    has_many :games, through: :playergames

  def self.authenticate(login_info)
    this_user = User.find_by_email(login_info[:email])
    if this_user && this_user.password == login_info[:password_hash]
      return this_user.id
    end
  end

  def self.from_omniauth(auth)
    where(auth.slice(:provider, :uid)).first_or_initialize.tap do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.name = auth.info.name
      user.oauth_token = auth.credentials.token
      user.oauth_expires_at = Time.at(auth.credentials.expires_at)
      user.save!
    end
  end
end
