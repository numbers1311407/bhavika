desc "Build with middleman"
desc :build do
  system "middleman build"
end

desc "Build then deploy"
task :deploy => :build do
  system "rsync -avz --delete build/ deploy@$BJARTUR:/srv/www/bhavika"
end
