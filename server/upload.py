from .settings import S3_ACCESS_KEY, S3_SECRET_KEY

from boto.s3.connection import S3Connection
import math, os
import boto
from filechunkio import FileChunkIO

# Connect to S3
def upload_document(document):
    c = S3Connection(S3_ACCESS_KEY, S3_SECRET_KEY)
    b = c.get_bucket('oilfront')

    # Get file info
    source_path = 'hello.txt'
    source_size = os.stat(source_path).st_size

    # Create a multipart upload request
    mp = b.initiate_multipart_upload('documents/%s' % source_path)

    # Use a chunk size of 50 MiB (feel free to change this)
    chunk_size = 52428800
    chunk_count = int(math.ceil(source_size / float(chunk_size)))

    # Send the file parts, using FileChunkIO to create a file-like object
    # that points to a certain byte range within the original file. We
    # set bytes to never exceed the original file size.
    for i in range(chunk_count):
        offset = chunk_size * i
        bytes = min(chunk_size, source_size - offset)
        with FileChunkIO(source_path, 'r', offset=offset,
                             bytes=bytes) as fp:
            mp.upload_part_from_file(fp, part_num=i + 1)

    # Finish the upload
    mp.complete_upload()
