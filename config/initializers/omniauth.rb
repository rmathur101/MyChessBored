OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, "565234783597821", "df1f3a2688c62e7a820dc65d36f788af"
end

