class DocumentService

  @@client = Elasticsearch::Client.new log: true

  def self.health
    @@client.cluster.health
  end

  def reload
    @@client.transport.reload_connections!
  end

  def save(doc)
    client.create doc
  end

  def query(term)
    client.search term
  end
end
